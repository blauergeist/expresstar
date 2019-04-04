import React from "react";

export default function Footer() {
  return (
    <footer className="bg-light text-black mt-6 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Expresstar
    </footer>
  );
}
