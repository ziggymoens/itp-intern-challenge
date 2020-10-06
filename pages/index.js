import React from 'react';
import { request } from '../lib/datocms';
import Link from "next/link";
import Header from "../components/header";

const HOMEPAGE_QUERY = `
query HomePage($limit: IntType) {
  allRecipes(first: $limit) {
    id
    title
    chef {
      name
      picture {
        responsiveImage(imgixParams: {fit: crop, w: "300", h: "300", auto: format}) {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          base64
        }
      }
    }
    combinewith
    createdAt
    ingredients {
      name
    }
    picture {
      responsiveImage(imgixParams: {auto: format, fit: crop, h: "300", w: "300"}) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
    slug
  }
  index{
    title
    subtitle
  }
}
`

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 3 }
  })

  return {
    props: {
      data
    }
  }
}

const recipeList = [
  {
    recipe: "Spaghetti",
    chef: "Joey",
  },
  {
    recipe: "Pancakes",
    chef: "Spock",
  },
  {
    recipe: "Soup",
    chef: "Michael",
  },
];

export default function Home({ data }) {
  return (
    <div>
      <Header />
      <div class="container">
        <div class="jumbotron">
          <h1 class="display-4">{data.index.title}</h1>
          <p class="lead">{data.index.subtitle}</p>
        </div>

        <div class="row">
          {data.allRecipes.map(recipe => (
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="card">
                <img src={recipe.picture.responsiveImage.src} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{recipe.title}</h5>
                  <p class="card-text">
                    Made by: {recipe.chef.name}
                  </p>
                  <Link as={`/${recipe.slug}`} href={"/[recipe]"}>
                    <a class="btn btn-primary w-100">
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