- Custom components [x]
- Pass down props to custom components [x]
- Change detection []
    You got it!
    -> Spec
    - Traverse the DOM, if a node is a box (will have _encapsulated) then
        - Create a new version of it,
        - Compare the new version to the old,
        - If different, also update its children.
- Function handlers in template [x]
- Update the dom + rendering [x]