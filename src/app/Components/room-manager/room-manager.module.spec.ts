import { RoomManagerModule } from './room-manager.module';

describe('RoomManagerModule', () => {
  let roomManagerModule: RoomManagerModule;

  beforeEach(() => {
    roomManagerModule = new RoomManagerModule();
  });

  it('should create an instance', () => {
    expect(roomManagerModule).toBeTruthy();
  });
});
