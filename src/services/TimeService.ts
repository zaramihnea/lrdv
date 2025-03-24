// src/services/TimeService.ts
export class TimeService {
  private serverTime: Date | null = null;
  private syncTime: number = 0;
  private isSynced: boolean = false;
  private syncPromise: Promise<void> | null = null;

  constructor() {
    // Initial sync and store the promise for awaiting
    this.syncPromise = this.syncWithServer();
    
    // Re-sync every minute to maintain accuracy
    setInterval(() => this.syncWithServer(), 60000);
  }

  async syncWithServer() {
    try {
      // Use Netlify function instead of external API
      const response = await fetch('/.netlify/functions/serverTime');
      
      // Fallback to worldtimeapi if Netlify function fails
      if (!response.ok) {
        await this.fallbackSync();
        return;
      }
      
      const data = await response.json();
      
      this.serverTime = new Date(data.datetime);
      this.syncTime = Date.now();
      this.isSynced = true;
      
      console.log(`Time synced with server: ${this.serverTime.toISOString()}`);
    } catch (error) {
      console.error('Failed to sync with server time:', error);
      await this.fallbackSync();
    }
  }
  
  // Fallback to worldtimeapi.org if Netlify function fails
  private async fallbackSync() {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Bucharest');
      const data = await response.json();
      
      this.serverTime = new Date(data.datetime);
      this.syncTime = Date.now();
      this.isSynced = true;
      
      console.log(`Time synced with fallback API: ${this.serverTime.toISOString()}`);
    } catch (error) {
      console.error('Fallback sync also failed:', error);
    }
  }

  // Get current server time, adjusted for elapsed time since sync
  getNow(): Date {
    if (!this.isSynced || !this.serverTime) {
      return new Date(); // Fallback to local time if not synced
    }
    
    // Calculate elapsed time since last sync and add to server time
    const elapsed = Date.now() - this.syncTime;
    return new Date(this.serverTime.getTime() + elapsed);
  }
  
  // Check if registration is open based on server time
  isRegistrationOpen(startDate: Date, endDate: Date): boolean {
    const now = this.getNow();
    return now >= startDate && now <= endDate;
  }
  
  // Wait for initial sync to complete - can be used during app startup
  async waitForSync(): Promise<void> {
    if (this.syncPromise) {
      await this.syncPromise;
    }
  }
}

export const timeService = new TimeService();