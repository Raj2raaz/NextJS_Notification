self.addEventListener("push", function (event) {
    const options = {
      body: event.data ? event.data.text() : "New notification!",
      icon: "/icon-192x192.png",
    };
    event.waitUntil(self.registration.showNotification("Hello!", options));
  });
  