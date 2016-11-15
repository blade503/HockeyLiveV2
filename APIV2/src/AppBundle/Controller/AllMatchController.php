<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;


class AllMatchController extends Controller
{
    /**
     * @Route("/", name="get_all_match")
     * @Method({"GET"})
     */
    public function getAllMatchAction(){
        $data = $this->RequestExternalApiForAllMatch();
        $TodaysMatch = $data->dates[0]->games;
        $matchs = $this->getAllMatch($TodaysMatch, $data->totalGames);
        $response = new Response(json_encode($matchs));
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:9000');
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function RequestExternalApiForAllMatch(){
        $ch = curl_init();
        $time = date('Y-m-d');
        curl_setopt($ch, CURLOPT_URL, 'https://statsapi.web.nhl.com/api/v1/schedule?startDate='.$time);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json')); // Assuming you're requesting JSON
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        return json_decode($response);
    }

    public function getAllMatch($games, $nbMatch){
        $matchs = array();
        for ($i=0; $i<$nbMatch; $i++){
            array_push($matchs, $this->getOneMatch($games, $i));
        }
        return array (
            "nbMatch" => $nbMatch,
            "matchs" => $matchs
        );
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
        );
    }
}
