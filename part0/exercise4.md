# Chain of events - using **Mermaid** Syntax
User create a new note on [notes](https://studies.cs.helsinki.fi/exampleapp/notes) by writing something into the text field and clicking **Save** button.

```mermaid
graph TD;
    A[user]-->|type| B(text field)
    B -->|click| C(Save)
```