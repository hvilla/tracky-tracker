const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
var assert = chai.assert;

var randomNames = require('random-name');
var randomEmail = require('random-email');

const apiUrl = 'http://localhost:9000/api/v1';

var userCreated = {};
var projectCreated = {};
var tasksCreated = [];

function delay(interval) 
{
   return it('should delay', done => 
   {
      setTimeout(() => done(), interval)

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}


describe('User Tests', async function() {
    it('should GET all the USER', async function() {
        const res = await chai.request(apiUrl).get('/user');
        res.should.have.status(200);
    });

    it('should not GET one valid USER',async function(){
        const res = await chai.request(apiUrl).get('/user/123213213123');
        res.should.have.status(404);
    });

    it('should CREATE one USER',async function(){
        const randomUser = {
          first_name:randomNames.first(),
          last_name:randomNames.last(),
          email:randomEmail({ domain: 'qrvey.com' }),
          password:'qwerty123'
        };
        const res = await chai.request(apiUrl).post('/user').send(randomUser);
        userCreated=res.body.data;
        res.should.have.status(201);
    });

    it('should GET the USER created',async function(){
        const res = await chai.request(apiUrl).get(`/user/${userCreated._id}`);
        assert.equal(res.body._id,userCreated._id);
    });
});

describe('Project Tests', async function() {
    it('should the USER created CREATE a PROJECT',async function(){
      const randomProject = {
        "name":`${userCreated.first_name} ${userCreated.last_name}'s Project`,
        "owner": userCreated._id
      };
    
      const res = await chai.request(apiUrl).post(`/project/`).send(randomProject);
      projectCreated = res.body.data;
      res.should.have.status(201);
    });
    
    it('should GET the PROJECT created',async function(){
      const res = await chai.request(apiUrl).get(`/project/${projectCreated._id}`);
      res.should.have.status(200);
    });

    it('should NOT CREATE a PROJECT without name',async function(){
      const randomProject = {
        "owner": userCreated._id
      }
      const res = await chai.request(apiUrl).post(`/project/`).send(randomProject);
      res.should.have.status(400);
    });
});

describe('Task Tests', async function() {
  it('should the USER created CREATE a TASK without name and without and PROJECT',async function(){
    const randomTask = {
      "owner": userCreated._id
    };
  
    const res = await chai.request(apiUrl).post(`/task/`).send(randomTask);
    tasksCreated.push(res.body.data);
    res.should.have.status(201);
  });
  
  it('should GET the TASK created without name and without and PROJECT',async function(){
    const res = await chai.request(apiUrl).get(`/task/${tasksCreated[0]._id}`);
    res.should.have.status(200);
  });

  it('should NOT CREATE a TASK without an USER',async function(){
    const randomTask = {
      "name":'Documentation Jeez!!!'
    }
    const res = await chai.request(apiUrl).post(`/task/`).send(randomTask);
    res.should.have.status(400);
  });

  it('should the USER created CREATE a TASK with name and without and PROJECT',async function(){
    const randomTask = {
      "name": `${randomNames.last()}'s Assigned Task`,
      "owner": userCreated._id
    };
    const res = await chai.request(apiUrl).post(`/task/`).send(randomTask);
    tasksCreated.push(res.body.data);
    res.should.have.status(201);
  });

  it('should GET the TASK created with name and without and PROJECT',async function(){
    const res = await chai.request(apiUrl).get(`/task/${tasksCreated[1]._id}`);
    res.should.have.status(200);
  });


  it('should the USER created CREATE a TASK with name and created PROJECT',async function(){
    const randomTask = {
      "name": `${randomNames.last()}'s Assigned Task`,
      "project": projectCreated._id,
      "owner": userCreated._id
    };

    const res = await chai.request(apiUrl).post(`/task/`).send(randomTask);
    tasksCreated.push(res.body.data);
    res.should.have.status(201);
  });

  it('should GET the TASK with name and created PROJECT',async function(){
    const res = await chai.request(apiUrl).get(`/task/${tasksCreated[2]._id}`);
    res.should.have.status(200);
  });

  it('should the USER created create a TASK and get his duration ',async function(){
    const randomTask = {
      "name": `${randomNames.last()}'s Assigned Task`,
      "project": projectCreated._id,
      "owner": userCreated._id
    };
    let res = await chai.request(apiUrl).post(`/task/`).send(randomTask);
    tasksCreated.push(res.body.data);
    res.should.have.status(201);
  });

  

  it('should play the TASK created and play it for 5 seconds',async function(){
    let res = await chai.request(apiUrl).put(`/task/toggle/${tasksCreated[3]._id}`);
    res.should.have.status(200);
  });

  delay(5000);

  it('should pause the TASK created before 5 Seconds',async function(){
    let res = await chai.request(apiUrl).put(`/task/toggle/${tasksCreated[3]._id}`);
    console.log("\tTime Duration",res.body.data.duration);
    assert.operator(res.body.data.duration, '>=', 5);
  });

  //ADITIONAL TASK


  it('should the USER created create a TASK and get his duration ',async function(){
    const randomTask = {
      "name": `${randomNames.last()}'s Assigned Task`,
      "project": projectCreated._id,
      "owner": userCreated._id
    };
    let res = await chai.request(apiUrl).post(`/task/`).send(randomTask);
    tasksCreated.push(res.body.data);
    res.should.have.status(201);
  });

  
  it('should play the TASK created and play it for 10 seconds',async function(){
    let res = await chai.request(apiUrl).put(`/task/toggle/${tasksCreated[4]._id}`);
    res.should.have.status(200);
  });

  delay(10000);

  it('should pause the TASK created before 5 Seconds',async function(){
    let res = await chai.request(apiUrl).put(`/task/toggle/${tasksCreated[4]._id}`);
    console.log("\tTime Duration",res.body.data.duration);
    assert.operator(res.body.data.duration, '>=', 10);
  });

  it('should play the TASK created and resume',async function(){
    let res = await chai.request(apiUrl).put(`/task/toggle/${tasksCreated[4]._id}`);
    res.should.have.status(200);
  });

  delay(5000);

  it('should pause the TASK created and resumed for 5 Seconds for a total of 15 secs',async function(){
    let res = await chai.request(apiUrl).put(`/task/toggle/${tasksCreated[4]._id}`);
    console.log("\tTime Duration",res.body.data.duration);
    assert.operator(res.body.data.duration, '>=', 15);
  });

  it('should show all the TASKs of the USER created (4 Tasks)',async function(){
    let res = await chai.request(apiUrl).get(`/task/user/${userCreated._id}`);
    //console.log("\tResponse list: ",res.body)
    assert.equal(res.body.length,5);
  });


});


