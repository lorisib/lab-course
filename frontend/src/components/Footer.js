export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div>
        © {new Date().getFullYear()} Store System. All rights reserved.
      </div>
    </footer>
  );
}