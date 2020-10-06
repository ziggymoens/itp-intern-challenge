import Header from "../components/header";
import Link from "next/link";

const recipeList = [
  {
    title: "Spaghetti",
    chef: "Joey",
  },
  {
    title: "Pancakes",
    chef: "Spock",
  },
  {
    title: "Soup",
    chef: "Michael",
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      <div class="container">
        <div class="jumbotron">
          <h1 class="display-4">Ziggy's recipes</h1>
          <p class="lead">More info here...</p>
        </div>
        <div class="row">
          {recipeList.map(recipe => (
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="card">
                <img src="" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{recipe.title}</h5>
                  <p class="card-text">
                    Made by: {recipe.chef}
                  </p>
                  <Link as={`/${recipe.title}`} href={"/[recipe]"}>
                    <a class="btn btn-primary">
                      More info...
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}