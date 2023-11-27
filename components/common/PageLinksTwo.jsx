import Link from "next/link";

export default function PageLinksTwo() {
  return (
    <div className="breadcrumbs mt-10 pt-0 pb-0">
      <div className="breadcrumbs__content">
        <div className="breadcrumbs__item">
          <Link href="/">Home</Link>
        </div>
        <div className="breadcrumbs__item">
          <Link href="/courses-list-3">All courses</Link>
        </div>
        <div className="breadcrumbs__item">
          <Link href={`/courses/${5}`}>User Experience Design</Link>
        </div>
        <div className="breadcrumbs__item">
          <Link href={`/courses/${3}`}>User Interface</Link>
        </div>
      </div>
    </div>
  );
}
