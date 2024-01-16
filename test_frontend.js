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
// const { Builder, By, until } = require('selenium-webdriver');

// async function runTest() {
//   const driver = await new Builder().forBrowser('chrome').build();

//   try {
//     await driver.get('http://localhost:3000/intern');

//     const postJobButton = await driver.wait(until.elementLocated(By.css('.btn1.btn-primary2')), 20000);
//     await Promise.all([
//       driver.wait(until.elementIsVisible(postJobButton), 20000),
//       driver.wait(until.elementIsEnabled(postJobButton), 20000),
//     ]);

//     await postJobButton.click();

//     console.log('Test for "Post a Job" button passed successfully!');
//   } catch (error) {
//     console.error('Test failed:', error);
//   } finally {
//     await driver.quit();
//   }
// }

// // Run the test function
// runTest();


async function testAdminPortal() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/adminportal'); // Update with the correct URL

    const readMessagesButton = await driver.wait(until.elementLocated(By.css('.admin-button=Read Messages')), 20000);
    await Promise.all([
      driver.wait(until.elementIsVisible(readMessagesButton), 20000),
      driver.wait(until.elementIsEnabled(readMessagesButton), 20000),
    ]);

    await readMessagesButton.click();

    const contactMessagesHeader = await driver.wait(until.elementLocated(By.css('h3=Contact Messages')), 20000);
    await driver.wait(until.elementIsVisible(contactMessagesHeader), 20000);

    console.log('Test for Admin Portal passed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await driver.quit();
  }
}
runTest();