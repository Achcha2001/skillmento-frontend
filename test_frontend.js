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
    await driver.get('http://localhost:3000/intern');

    const postJobButton = await driver.wait(until.elementLocated(By.css('.btn1.btn-primary2')), 20000);
    await Promise.all([
      driver.wait(until.elementIsVisible(postJobButton), 20000),
      driver.wait(until.elementIsEnabled(postJobButton), 20000),
    ]);

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
// const { Builder, By, until } = require('selenium-webdriver');

// async function testReadMessagesButton() {
//   const driver = await new Builder().forBrowser('chrome').build();

//   try {
//     // Navigate to the admin portal URL
//     await driver.get('http://localhost:3000/adminportal');

//     // Locate and click the "Read Messages" button
//     const readMessagesButton = await driver.wait(until.elementLocated(By.css('.admin-button')), 20000);
//     await Promise.all([
//       driver.wait(until.elementIsVisible(readMessagesButton), 20000),
//       driver.wait(until.elementIsEnabled(readMessagesButton), 20000),
//     ]);
//     await readMessagesButton.click();

//     // Verify that the messages container is displayed
//     const messagesContainer = await driver.wait(until.elementLocated(By.css('.messages-container')), 20000);
//     const messages = await messagesContainer.findElements(By.css('ul li'));
    
//     if (messages.length > 0) {
//       console.log('Test for "Read Messages" button passed successfully!');
//     } else {
//       console.error('No messages found. Test failed.');
//     }
//   } catch (error) {
//     console.error('Test for "Read Messages" button failed:', error);
//   } finally {
//     // Close the browser window
//     await driver.quit();
//   }
// }

// // Run the test for the "Read Messages" button
// testReadMessagesButton();


