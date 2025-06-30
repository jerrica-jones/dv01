


Notes:  my npm option is quite farther along, so needed to add node options to the start scripts portion of package.json because Node.js 17+ changed how OpenSSL works by default

The version given for recharts in package.json doesn't have a type declaration to work with typescript, so I added one.

also didn't know if you wanted me to update the api js file to typescript. I just did the bare minimum to make it ts, in a real commit, I'd update it more thoroughly