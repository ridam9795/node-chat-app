const expect=require('expect');
const {generateMessage}=require('./message');;
it('should generate correct text message',()=>{
    var from='arun';
    var text='hello'
    var message=generateMessage(from,text);
  
    expect(message).toInclude({
        from,text
    })
    expect(message.createdAt).toBeA('number');
})