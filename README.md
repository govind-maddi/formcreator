# FormCreator Readme

FormCreator lets you create dynamic forms with three types of inputs: text, select, and textarea. The website is responsive, ensuring a seamless user experience across various devices.

## Features

- **Dynamic Form Creation**: Users can easily create dynamic forms using text, select, and textarea inputs.
- **Responsive Design**: The website is responsive, adapting to different screen sizes and devices.
- **Component Handling**: Clicking on each of the three component selectors (Input, Select, Textarea) triggers the `handleComponentAdd` function, which dynamically creates the form components using the Document Object Model (DOM) and adds them to the webpage.
- **Unique IDs and Drag-and-Drop**: Each component receives a unique ID, and drag-and-drop functionality is seamlessly integrated for easy component manipulation.
- **Interactive Component Controls**: Components are equipped with three buttons - Edit, Delete, and Cancel/Confirm - which become visible upon selecting a component.
- **Edit Functionality**: Clicking the Edit button delegates the event to the component layout's inner container. If the target is a button, the `handleEditComponent` function is invoked with the child component's ID, allowing users to edit component values. Previous values, if available, are displayed for editing.
- **Cancel and Confirm**: The Cancel/Confirm button allows users to either cancel component selection or confirm and save changes.
- **Deletion**: Clicking the Delete button removes the respective component from the form.
- **Sortable Drag-and-Drop**: The component layout's inner container features sortable drag-and-drop functionality, enabling users to rearrange the layout as desired.
- **Save Functionality**: Clicking the Save button on the navigation container triggers the mapping of the component layout's inner container. All children components with their attributes are saved as an array and JSON format
