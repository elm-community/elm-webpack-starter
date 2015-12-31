import Html exposing (..)
import Html.Attributes exposing (..)

-- component import example
import Components.Hello exposing ( hello )

-- app kick off
main =
  div
    [ class "mt-palette-accent", style styles.wrapper ]
    [
      hello,
      text "Elm Webpack Starter"
    ]

-- inline CSS example
styles =
  {
    wrapper =
      [
        ( "padding-top", "10px" ),
        ( "padding-bottom", "10px" ),
        ( "text-align", "center" )
      ]
  }
