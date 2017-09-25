# Loop-request

An extremely basic script to loop-request similar queries.

As of now is making a get request to nic.cl to ask for available domains.

It first creates all possible 3-letter domains and then queries them all, registering the available ones.

With `http.globalAgent.maxSockets = 5` a maximum of 5 simultaneous requests are being made.
