var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
describe('generateLocationMessage',()=>{
  it('should generate correct message object',()=>{
    var from='Admin'
    var latitude=15
    var longitude=19
    var locationMessage=generateLocationMessage(from,latitude,longitude);
    expect(locationMessage).toInclude({
      from,
      url:`https://www.google.com/maps?q=${latitude},${longitude}`,
     
      
    });
    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
  })
})