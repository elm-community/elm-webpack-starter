import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing ( onClick )
import String

-- official 'Elm Architecture' package
-- https://github.com/evancz/start-app
import StartApp.Simple as StartApp

-- component import example
import Components.Hello exposing ( hello )


-- APP KICK OFF!
main =
  StartApp.start
    { model = model
    , view = view
    , update = update
    }


-- MODEL
model = 0


-- VIEW
-- Examples of:
-- 1)  an externally defined component ('hello', takes 'model' as arg)
-- 2a) styling through CSS classes (external stylesheet)
-- 2b) styling using inline style attribute (two variants)
view address model =
  div
    [ class "mt-palette-accent", style styles.wrapper ]
    [ hello model
    ,  p [ style [( "color", "#FFF")] ] [ text ( "Elm Webpack Starter" ) ]
    ,  button [ class "mt-button-sm", onClick address Increment ] [ text "FTW!" ]
    ]


-- UPDATE
type Action = Increment

update action model =
  case action of
    Increment -> model + 1


-- CSS STYLES
styles =
  {
    wrapper =
      [ ( "padding-top", "10px" )
      , ( "padding-bottom", "20px" )
      , ( "text-align", "center" )
      ]
  }
