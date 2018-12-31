const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');


beforeEach((done) => {
    Todo.deleteMany().then(() => {
        done();
    })
})

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Text for test';

        request(app)
            .post('/todos')
            .expect(200)
            .send({text})
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                })
            });
    });


    it('should not create a new todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .expect(400)
            .send({})
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});