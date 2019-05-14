import React from "react";

export default function Footer() {
  return (
    <footer className="d-flex justify-content-center pv4 ph3 ph5-m ph6-l mid-gray tc">
      Copyright &copy; {new Date().getFullYear()} Expresstar
    </footer>
  );
}
