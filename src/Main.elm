import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing ( onClick )
import Effects exposing (Effects)

-- official 'Elm Architecture' package
-- https://github.com/evancz/start-app
import StartApp

-- component import example
import Components.Hello exposing ( hello )

-- APP KICK OFF!
app = StartApp.start
  { init = init
  , update = update
  , view = view
  , inputs = [ Signal.map (always NoOp) swap]
  }

main = app.html

-- HOT-SWAPPING
port swap : Signal.Signal Bool

-- MODEL
type alias Model = Int

-- INIT
init =
  (0, Effects.none)

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
    ,  img [ src "img/elm.jpg", style [( "display", "block"), ( "margin", "10px auto")] ] []
    ]


-- UPDATE
type Action 
  = NoOp
  | Increment

update action model =
  case action of
    NoOp -> ( model, Effects.none )
    Increment -> ( model + 1, Effects.none )


-- CSS STYLES
styles =
  {
    wrapper =
      [ ( "padding-top", "10px" )
      , ( "padding-bottom", "20px" )
      , ( "text-align", "center" )
      ]
  }
  
