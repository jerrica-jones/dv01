How to Install:

npm install

How to Run:

npm start

The app will open at 'http://localhost:3000'.

How to Run Tests:

npm test

Tech Stack:
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.126",
    "@types/papaparse": "^5.3.16",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "papaparse": "^5.5.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-scripts": "5.0.1",
    "recharts": "^3.0.2",
    "typescript": "^4.9.5",

Saving views -- If the filters change values, and there is not already a view with that filter configuration, you can now create a saved view of that filter state. An input box
opens to create a view label, and a button to save the view becomes available. If all of the filters are set to 'All', the ability to create a saved view is disabled, because the reset button allows the user to get to that state. If the filter configuration matches a saved view, the saved views dropdown will re-render to show the view currently represented by the filter state. TODO -- In future iterations, the saved views dropdown can be hidden if there are no saved views available. Also the UI could look a lot nicer.

Data pulling -- Since the dataset is static, I loaded it into state in a useEffect. I knew the data wouldn't change, so I also put the original aggregations into state to use on reset. If the data needed to be fresh upon every render, I would have changed this approach.

UI changes -- I added labels to the dropdowns to make it more user friendly and also moved them above the table. I did this because there were no instructions on where to put the graph, and if it was supposed to be added to the end, I thought it seemed weird to have the dropdowns in the middle.

Efficiency -- I questioned whether to get the year options while aggregating the data for the first render in the same function so the data was only traversed once. Since the data set was small and the year options were only grabbed in the first useEffect, I decided it was cleaner and better for testing purposes to make two functions. I added memo to the dropdown component. It could have gone either way since memo is expensive if the component is small, but there are 4 dropdowns and they re-render a lot less often with it.

Further polish -- If this was a real production commit, I would have alphabetized things like imports, I would have polished the UI quite a bit more. If more data was expected, I would have used a loading visual, but with such a small set, there would be no time to see it. I also would have spent more time on data sanitization and error handling.

CSS -- There were already styles added to App.css. I left them there and added new ones below.



***** Archived, Outdated ***************************************

Notes: Start issues -- I continued to work with React 16.14 given in the package.json, because I thought that was expected. I should have clarified if that was the case. Since my Node was 17+, this conflicted with OpenSSL. To make it work, I added the export for NODE_OPTIONS.

TS updates -- There wasn't a specified version of TypeScript in the package.json, so I ran a regular install, which updated my dependency to TypeScript 5. Recharts didn't have a type delcaration to work with typescript, so I added one. I minimally converted the api files in 'request' to typescript as well.

Only logic unit tests -- Trying to work with React 16, TypeScript 5, and install Jest and testing libraries was a bit of a hurdle. Nothing wanted to play nice, so I switched to yarn. It seemed like a larger risk to try and switch the React version, as I had already made significant headway on the implementation. Even with yarn, I was having random dependency issues, so I decided to remove all of the changes that would let me use testing libraries and just unit test the utility functions.

