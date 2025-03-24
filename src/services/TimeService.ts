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
      // Use worldtimeapi.org as the primary time source
      const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Bucharest');
      
      if (!response.ok) {
        throw new Error('Failed to fetch time from worldtimeapi.org');
      }
      
      const data = await response.json();
      
      this.serverTime = new Date(data.datetime);
      this.syncTime = Date.now();
      this.isSynced = true;
      
      console.log(`Time synced with server: ${this.serverTime.toISOString()}`);
    } catch (error) {
      console.error('Failed to sync with server time:', error);
      
      // Fallback to local time if API fails
      this.serverTime = new Date();
      this.syncTime = Date.now();
      this.isSynced = true;
      
      console.warn('Using local time as fallback due to sync failure');
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