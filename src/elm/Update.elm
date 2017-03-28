module Update exposing (..)

import Models exposing (Model)
import Msgs exposing (Msg)

-- UPDATE


update : Msg -> Model -> Model
update msg model =
  case msg of
    Msgs.NoOp -> model
    Msgs.Increment -> model + 1