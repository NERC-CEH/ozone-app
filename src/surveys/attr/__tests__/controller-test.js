import API from '../controller';

describe('Surveys Attr Controller', () => {
  it('should have a show method', () => {
    expect(API.show).to.be.a('function');
  });
});
