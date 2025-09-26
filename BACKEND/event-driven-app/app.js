// app.js
const EventEmitter = require("events");

// Create an instance of EventEmitter
const eventBus = new EventEmitter();


// userLoggedIn event
eventBus.on("userLoggedIn", (username) => {
  console.log(`> User ${username} logged in`);
});

// Another listener for the same event 
eventBus.on("userLoggedIn", (username) => {
  console.log(`> Notification sent to ${username}`);
});

// messageReceived event
eventBus.on("messageReceived", (username, message) => {
  console.log(`> New message for ${username}: "${message}"`);
});

// dataSynced event
eventBus.on("dataSynced", (username) => {
  console.log(`> Data sync complete for ${username}`);
});

function simulateApp() {
  const user = "John";

  // Step 1: User logs in
  setTimeout(() => {
    eventBus.emit("userLoggedIn", user);

    // Step 2: User receives a message
    setTimeout(() => {
      eventBus.emit("messageReceived", user, "Hello John, welcome back!");

      // Step 3: Data syncing starts
      setTimeout(() => {
        console.log("> Syncing user data...");
        // Step 4: Data sync complete
        setTimeout(() => {
          eventBus.emit("dataSynced", user);
        }, 1500);
      }, 1000);
    }, 1000);
  }, 1000);
}

// Start simulation
simulateApp();
