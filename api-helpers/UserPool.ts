export class UserPool {
  private users = [
    { username: 'nonAdm_test1', password: 'nadmtest1' },
    { username: 'nonAdm_test2', password: 'nadmtest2' },
    { username: 'nonAdm_test3', password: 'nadmtest3' },
  ];
  
  private currentIndex = 0;
  
  getNextUser() {
    const user = this.users[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.users.length;
    return user;
  }
}