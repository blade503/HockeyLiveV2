<?php

namespace AppBundle\Controller;

use AppBundle\AppBundle;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Pari;


class PariController extends Controller
{

    /**
     * @Route("/parier", name="parier")
     * @Method({"POST"})
     */
    public function ParierAction(Request $request){
        $content = $this->get("request")->getContent();
        if (!empty($content))
        {
            $params = json_decode($content, true);
            $em = $this->getDoctrine()->getManager();
            $Pari = new Pari($params["idPari"],$params["idMatch"], $params["idJoueur"], $params["montant"], $params["equipe"], $params["statut"]);
            $em->persist($Pari);
            $em->flush();
            $response = new Response();
            $response->setStatusCode(200);
            return $response;

        }
        $response = new Response();
        $response->setStatusCode(500);
        return $response;
    }

    /**
     * @Route("/parier/all", name="parier_all")
     * @Method({"GET"})
     */
    public function getAllPariAction(){
        $em = $this->getDoctrine()->getManager();
        $res = $em->getRepository(Pari::class)->findAll();
        $paris = array();
        for($i=0; $i<sizeof($res); $i++){
            array_push($paris, array(
                "idMatch" => $res[$i]->getIdMatch(),
                "idPari" => $res[$i]->getIdPari(),
                "idJoueur" => $res[$i]->getIdJoueur(),
                "status" => $res[$i]->getStatusPari(),
                "montant" => $res[$i]->getMontant(),
                "equipe" => $res[$i]->getEquipePari(),
            ));
        }
        $response = new Response(json_encode($paris));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/parier/{idJoueur}", name="parier_get_pari_joueur")
     * @Method({"GET"})
     */
    public function getPariJoueurAction($idJoueur){
        $em = $this->getDoctrine()->getManager();
        $res = $em->getRepository(Pari::class)->findBy(array("idJoueur" => $idJoueur));
        $paris = array();
        for($i=0; $i<sizeof($res); $i++){
            array_push($paris, array(
                "idMatch" => $res[$i]->getIdMatch(),
                "idPari" => $res[$i]->getIdPari(),
                "idJoueur" => $res[$i]->getIdJoueur(),
                "status" => $res[$i]->getStatusPari(),
                "montant" => $res[$i]->getMontant(),
                "equipe" => $res[$i]->getEquipePari(),
            ));
        }
        $response = new Response(json_encode($paris));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }
}
