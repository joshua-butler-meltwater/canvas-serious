// This file contains a mock module for handling Figma assets
// It serves as a placeholder for local development

const handler = {
  get: function(target, prop) {
    return 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23e0e0e0%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2250%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20fill%3D%22%23888%22%3EImage%3C%2Ftext%3E%3C%2Fsvg%3E';
  }
};

export default new Proxy({}, handler);
