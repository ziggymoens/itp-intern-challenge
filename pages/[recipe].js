import React from 'react';
import { useRouter } from "next/router";
import { request } from '../lib/datocms';
import Header from "../components/header";

const RECIPE_QUERY = `
query Recipe ($limit: IntType){
    allRecipes(first: $limit) {
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
        quantity
        amount
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
      instructions{
        step
        instructiontext
      }
      slug
    }
  }
`

export async function getStaticPaths() {
    const data = await request({
        query: RECIPE_QUERY,
        variables: { limit: 3 }
    })

    const paths = data.allRecipes.map(r => ({
        params: { recipe: r.slug },
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps() {
    const data = await request({
        query: RECIPE_QUERY,
        variables: { limit: 3 }
    })

    return {
        props: {
            data
        }
    }
}

export default function Home({ data, params }) {
    const router = useRouter();
    const recipe = router.query;
    console.log(recipe)

    const reci = data.allRecipes.find(function (r) {
        if (r.slug === recipe.recipe) {
            return r;
        }
    });

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Header />
            <div class="container">
                <div class="jumbotron">
                    <h1 class="display-4">{reci.title}</h1>
                    <p class="lead">Made by: {reci.chef.name} <br></br>Best combine with: {reci.combinewith}</p>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 col-md-8 col-sm-10">
                        <h3>Ingredients</h3>
                        <ul>
                            {reci.ingredients.map(ingredient => (
                                <li>
                                    <p>{ingredient.amount} {ingredient.quantity} {ingredient.name}</p>
                                </li>
                            ))}
                        </ul>
                        <br></br>
                        <h3>Instructions</h3>
                        {reci.instructions.map(instruction => (
                            <div>
                                <h4>Step: {instruction.step}</h4>
                                <p>{instruction.instructiontext}</p>
                            </div>
                        ))}
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-2">
                        <h3>{reci.chef.name}</h3>
                        <img class="w-75" src={reci.chef.picture.responsiveImage.src} />
                    </div>
                </div>
            </div>
        </div>
    )
}