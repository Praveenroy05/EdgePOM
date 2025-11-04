// Hooks - Special type of function which perform certain action before or after execution of test cases


// test.beforeAll() - // This hook will execute once before all the test cases in the file
// test.beforeEach() - This hook will execute before each test case in the file
// test()
// test.afterEach() - This hook will execute after each test case in the file
// test.afterAll() - This hook will execute once after all the test cases in the file






import {test} from '@playwright/test'

test.beforeAll(() => {
    console.log('Before All Tests')
})
test.beforeEach(() => {
    console.log('Before Each Test')
})

test.afterEach(() => {
    console.log('After Each Test')
})

test.afterAll(() => {
    console.log('After All Test')
})

test("Test1", async ()=>{
    console.log("Test1");
})

test("Test2", async ()=>{
    console.log("Test2");
})

test("Test3", async ()=>{
    console.log("Test3");
})

test("Test4", async ()=>{
    console.log("Test4");
})