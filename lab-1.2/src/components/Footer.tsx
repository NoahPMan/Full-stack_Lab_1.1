export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p id="copyright">
        Copyright Pixell River Financial {year}.
      </p>
    </footer>
  );
}