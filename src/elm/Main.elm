module Main exposing (..)
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing ( onClick )

-- component import example
import Components.Hello exposing ( hello )


-- APP
main : Program () Model Msg
main =
  Browser.sandbox { init = model, view = view, update = update }


-- MODEL
type alias Model = Int

model : Model
model = 0


-- UPDATE
type Msg = NoOp | Increment

update : Msg -> Model -> Model
update msg m =
  case msg of
    NoOp -> m
    Increment -> m + 1


-- VIEW
-- Html is defined as: elem [ attribs ][ children ]
-- CSS can be applied via class names or inline style attrib
view : Model -> Html Msg
view m =
  div [ class "container", style "margin-top" "30px", style "text-align" "center" ][    -- inline CSS (literal)
    div [ class "row" ][
      div [ class "col-xs-12" ][
        div [ class "jumbotron" ][
          img [ src "static/img/elm.jpg", style "width" "33%", style "border" "4px solid #337AB7" ] []
          , hello m                                                                     -- ext 'hello' component (takes 'model' as arg)
          , p [] [ text ( "Elm Webpack Starter" ) ]
          , button [ class "btn btn-primary btn-lg", onClick Increment ] [                  -- click handler
            span[ class "glyphicon glyphicon-star" ][]                                      -- glyphicon
            , span[][ text "FTW!" ]
          ]
        ]
      ]
    ]
  ]
