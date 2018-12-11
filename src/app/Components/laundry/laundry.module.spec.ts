import { LaundryModule } from './laundry.module';

describe('LaundryModule', () => {
  let laundryModule: LaundryModule;

  beforeEach(() => {
    laundryModule = new LaundryModule();
  });

  it('should create an instance', () => {
    expect(laundryModule).toBeTruthy();
  });
});
