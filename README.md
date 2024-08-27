# React Seat Toolkit

<a aria-label="License" href="https://github.com/mezh-hq/react-seat-toolkit/blob/main/LICENSE">
  <img alt="" src="https://img.shields.io/badge/License-MIT-yellow.svg">
</a>
<a aria-label="CI Release" href="https://github.com/mezh-hq/react-seat-toolkit/actions/workflows/release.yml">
  <img alt="" src="https://github.com/mezh-hq/react-seat-toolkit/actions/workflows/release.yml/badge.svg">
</a>
<a aria-label="CI Release" href="https://github.com/mezh-hq/react-seat-toolkit/actions/workflows/prerelease.yml">
  <img alt="" src="https://github.com/mezh-hq/react-seat-toolkit/actions/workflows/prerelease.yml/badge.svg">
</a>
 
<br/>

---

### React UI library to design and render seat layouts.

### Storybook: [https://mezh-hq.github.io](https://mezh-hq.github.io)

<br/>

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/a34e5eb6-73e6-437a-8712-8aaefed26483">

<p align="center">
  <img width="49.5%" alt="image" src="https://github.com/user-attachments/assets/e6b08c94-fa08-4fd0-ad1d-9454f9511c0c">
  <img width="49.5%" alt="image" src="https://github.com/user-attachments/assets/63405b00-b821-4a3a-9c16-66a1f05bd114">
</p>

## Features

- **JSON based**: Define your seat layout using JSON data and retrieve it back as JSON after customization ✓

- **Customizable**: Customize the layout as per your requirements

  - **Seats**

    - Add new seats ✓
    - Remove existing seats ✓
    - Change seat colors ✓
    - Change seat labels ✓
    - Change seat status ✓
    - Group seats into categories ✓
    - Categorizer (Manage seat categories) ✓

  - **Pen**

    - Draw on the layout using a pen tool to create custom shapes ✓

  - **Text**

    - Add text to the layout ✓
    - Change text color ✓
    - Change text size ✓
    - Change text font weight ✓

  - **Shapes**

    - Add shapes to the layout ✓
    - Change shape color ✓
    - Change shape size ✓
    - Change shape border color ✓

  - **Sections**

    - Section manager ✓
    - Free seating sections ✓

  - **Miscallaneous**
    - Add, move around and scale background images ✓
    - Multiple element selection and deselection ✓
    - Rotate elements ✓
    - Bring elements to front or back ✓

- **Responsive**: The layout is responsive and can be viewed on any device ✓

- **Designer mode and User mode**: Switch between designer and user mode to enable or disable customization ✓

- **Custom styles**: Override the default styles to match your application's theme ✓

## Installation

Run `bun i @mezh-hq/react-seat-toolkit` to incorporate into your project <br/>

## Usage

### User mode

```jsx
import React from "react";
import SeatToolkit from "@mezh-hq/react-seat-toolkit";
import "@mezh-hq/react-seat-toolkit/styles";

const App = () => {
  const data = {
    seats: [
      {
        id: "1",
        x: 100,
        y: 100,
        label: "A1",
        color: "blue"
      }
    ]
  };
  return (
    <SeatToolkit
      mode="user"
      data={data}
      events={{
        onSeatClick: (seat) => {
          console.log(seat);
        },
        onSectionClick: (section) => {
          console.log(section);
        }
      }}
    />
  );
};

export default App;
```

### Designer mode

```jsx
import React from "react";
import SeatToolkit from "@mezh-hq/react-seat-toolkit";
import "@mezh-hq/react-seat-toolkit/styles";

const App = () => {
  return (
    <SeatToolkit
      mode="designer"
      events={{
        onExport: (data) => {
          console.log(data);
        }
      }}
    />
  );
};

export default App;
```

#### Note: If you're using the toolkit in a Next.js project, you probably will need to dynamically import the toolkit to avoid SSR issues.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/mezh-hq/react-seat-toolkit/blob/main/CONTRIBUTING.md) for details on setting up your development environment and the process of submitting pull requests to us.
