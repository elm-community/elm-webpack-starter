module Main exposing (..)

import Html exposing (beginnerProgram)
import Models exposing (Model, model)
import Msgs exposing (Msg)
import Update exposing (update)
import View exposing (view)

-- component import example
import Components.Hello exposing ( hello )


-- APP
main : Program Never Int Msg
main =
  Html.beginnerProgram { model = model, view = view, update = update }
