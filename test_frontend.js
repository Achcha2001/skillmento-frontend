// const { Builder, By, until } = require('selenium-webdriver');

// async function runTest() {
  
//   const driver = await new Builder().forBrowser('chrome').build();

//   try {
//     // Navigate to the URL
//     await driver.get('http://localhost:3000');

    
//     const linkText = 'CV Ideas';

//     // Wait for the link to be clickable
//     const link = await driver.wait(until.elementLocated(By.xpath(`//a[text()="${linkText}"]`)), 20000);

//     // Click the link
//     await link.click();

    
//     console.log(`Test for "${linkText}" passed successfully!`);
//   } catch (error) {
//     // Output error details to console
//     console.error('Test failed:', error);
//   } finally {
//     // Close the browser window
//     await driver.quit();
//   }
// }

// // Run the test function
// runTest();



// const { Builder, By, until } = require('selenium-webdriver');

// async function runTest() {
  
//   const driver = await new Builder().forBrowser('chrome').build();

//   try {
//     // Navigate to the URL
//     await driver.get('http://localhost:3000');

    
//     const linkText = 'Login';

   
//     const link = await driver.wait(until.elementLocated(By.xpath(`//a[text()="${linkText}"]`)), 20000);

//     // Click the link
//     await link.click();

    
//     console.log(`Test for "${linkText}" passed successfully!`);
//   } catch (error) {
//     // Output error details to console
//     console.error('Test failed:', error);
//   } finally {
//     // Close the browser window
//     await driver.quit();
//   }
// }

// // Run the test function
// runTest();
const { Builder, By, until } = require('selenium-webdriver');

async function runTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to the URL
    await driver.get('http://localhost:3000/employer');

    // Wait for the "Post a Job" button to be clickable
    const postJobButton = await driver.wait(until.elementLocated(By.css('.btn1.btn-primary2')), 20000);
    await driver.wait(until.elementIsVisible(postJobButton), 20000);
    await driver.wait(until.elementIsEnabled(postJobButton), 20000);

    // Click the "Post a Job" button
    await postJobButton.click();

   

    console.log('Test for "Post a Job" button passed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await driver.quit();
  }
}

// Run the test function
runTest();

