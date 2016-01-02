module Components.Hello where

import Html exposing (..)
import Html.Attributes exposing (..)
import String

-- hello component
hello model =
  div
    [ class "mt-h2" ]
    [ text ( "Hello, World" ++ ( "!" |> String.repeat model ) ) ]
