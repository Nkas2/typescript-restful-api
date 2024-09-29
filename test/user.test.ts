import supertest from "supertest";
import {web} from '../src/application/web'
import { UserTest } from "./test-utils";
import { logger } from "../src/application/logging";

describe('POST /api/users', () => { 

    afterEach(async () => {
        await UserTest.delete("nayandra")
    })

    it('register user(success)', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: "nayandra",
                name: "nayandra kastoro",
                password: "Nayandra123"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe('nayandra kastoro');
        expect(response.body.data.username).toBe('nayandra');
    });

    it('register user(failde)', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: "",
                name: "",
                password: ""
            })

        logger.debug(response.body)
        
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    });

    it('register with already username', async () => {

        UserTest.create()
        const response = await supertest(web)
            .post('/api/users')
            .send({
                name: "nayandra kastoro",
                username: "nayandra",
                password: "admin123"
            })

        
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    });
    
    
    
})