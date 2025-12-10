# Single Page App diagram
User creates a new note on [notes](https://studies.cs.helsinki.fi/exampleapp/notes) by writing something into the text field and clicking **Save** button.

```mermaid
sequenceDiagram
    actor user
    participant browser
    participant server

    user->>browser: Submit input
    Note right of browser: The event handler prevents the default form submit \n The event handler creates and adds new note to the note list, then rerenders the note list before sending the new note to the server.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_Spa
    activate server
    server-->>browser: 201 Created
    deactivate server
```