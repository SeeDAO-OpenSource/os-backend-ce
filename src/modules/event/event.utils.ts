function getRandomPin(chars: string, len: number): string {
    return [...Array(len)]
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');
  }
  
  function getRandomAttendCode(): string {
    return getRandomPin('0123456789', 4);
  }
  
  function getEndtime(start?: Date, duration?: number): Date {
    if (start && duration) {
      return new Date(new Date(start).getTime() + Number(duration) * 60000);
    } else if (start) {
      return new Date(new Date(start).getTime() + 60 * 60000);
    } else {
      return new Date(Date.now() + 60 * 60000);
    }
  }
  
  export { getRandomPin, getRandomAttendCode, getEndtime };