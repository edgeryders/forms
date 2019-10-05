# Edgeryder Forms

## Self hosted forms on Edgeryders

For the time being forms are stored in a single JSON file - in this instance /data/demo.js.

An example form, using this template:

```
festival_ticket: {
    title: 'Festival Ticket',
    slug: 'festival_ticket',
    id: 'registration',
    description: 'Sign up to the Edgeryders Festival, November 19-29th 2019!',
    background: {
      splash: '#1AA4B8',
      standard: '#EDF2F7',
      confirm: '#EDF2F7'
    },
    color: {
      splash: '#fff'
    },
    link: {
      name: 'festival.edgeryders.eu',
      url: 'https://festival.edgeryders.eu'
    },
    splash: [
    {
      text: "<h1>So, you want to join the Edgeryders Festival in November?</h1> <p class='highlight'>Great! Your skills and knowledge are valuable.</p> <p>Participation does not cost money. You secure your ticket by filling out this form and following the instructions for some small and easy tasks that will be sent to you by email afterwards.</p>",
    }
    ],
    questions: [
    {
        question: "What is your email address so we can contact you?",
        small: "Don't worry, we're not going to spam you.",
        type: 'email',
        id: 'email'
      },
      {
        question: "Your name or alias so we know what to call you?",
        type: 'text',
        minLength: 2,
        id: 'name'
      },
      {
        question: "What languages do you speak?",
        type: 'text',
        minLength: 3,
        id: 'languages'
      },
      {
        question: "The name of the city you live/are based in?",
        type: 'text',
        minLength: 3,
        id: 'city'
      },
      {
        question: "All Edgeryders events are co-created in order to ensure that they are rewarding, high quality experience tailored around each participant’s interests. Perhaps you're planning a demo, a seminar or a workshop that you want to plug into one of the planned events? Or maybe you can help with doing something during the festival like helping take notes during a session. Tell us a little bit about yourself and we’ll help you to find out how you can best benefit from, and contribute to, your participation in the Edgeryders Festival.",
        type: 'box',
        minLength: 3,
        id: 'bio'
      }
      ],
      confirm: {
        id: 'confirm',
        text: "That's it! Click submit and keep a lookout for festival events happening in our locations or host one yourself! There are also events happening in Brussels, Warsaw, Stockholm and Berlin where you participate."
      },
}
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
