<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class OneMatchController extends Controller
{

    /**
     * @Route("/{id}", name="get_one_match")
     * @Method({"GET"})
     */
    public function getOneMatchAction($id){
        $data = $this->RequestExternalApiForAllMatch();
        $TodaysMatchs = $data->dates[0]->games;
        for($i=0; $i<$data->totalGames; $i++){
            $match = $this->getOneMatch($TodaysMatchs, $i);
            if($match["idMatch"] == $id){
                $response = new Response(json_encode($match));
                $response->headers->set('Content-Type', 'application/json');
                return $response;
            }
        }
        $response = new Response();
        $response->setStatusCode(500);
        return $response;
    }


    public function RequestExternalApiForAllMatch(){
        $ch = curl_init();
        $time = date('Y-m-d');
        curl_setopt($ch, CURLOPT_URL,'https://statsapi.web.nhl.com/api/v1/schedule?startDate='.$time.'&endDate='.$time.'&expand=schedule.linescore');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json')); // Assuming you're requesting JSON
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        return json_decode($response);
    }

    public function getOneMatch($games, $idMatch){
        return $res = array(
            "idMatch" => $games[$idMatch]->gamePk,
            "startTime" => $games[$idMatch]->gameDate,
            "score" => $games[$idMatch]->teams->home->score .":".$games[$idMatch]->teams->away->score,
            "home" => array(
                "name" => $games[$idMatch]->teams->home->team->name,
                "score" => $games[$idMatch]->teams->home->score,
                "id" => $games[$idMatch]->teams->home->team->id,
                "stats" => $games[$idMatch]->teams->home->leagueRecord,

            ),
            "away" => array(
                "name" => $games[$idMatch]->teams->away->team->name,
                "score" => $games[$idMatch]->teams->away->score,
                "id" => $games[$idMatch]->teams->away->team->id,
                "stats" => $games[$idMatch]->teams->away->leagueRecord,
            ),
            "localisation" => $games[$idMatch]->venue->name,
            "status" => $games[$idMatch]->status,
            "linescore" => $games[$idMatch]->linescore,
        );
    }

}
