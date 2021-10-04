import * as db from "./mongodb.ts";

import { 
    test, 
    TestSuite, 
    afterAll,
    beforeAll,
    describe,
    it,
    assertNotEquals
} from "../deps.ts";

describe("mongodb operation tests.", () => {
    beforeAll(async () => {
        await db.connectDb('mongodb://127.0.0.1:27017')
    })

    afterAll(() => {
        db.disconnectDb()
    })

    it("countDocs",async () => {
        const num = await db.countDocs({'galleryMetadata.gid':2010179})

        assertNotEquals(num, 0)
    })
    
})