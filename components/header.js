import Link from "next/link";
import Head from "next/head";

export default function Header() {
    return (
        <div>
            <Head>
                <title>Ziggy's recipes</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"></link>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            </Head>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">Ziggy's Recipes</a>
                </div>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link href="/">
                            <a class="nav-link">Home <span class="sr-only"></span></a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}