<?php


namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="Pari")
*/
class Pari
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name ="idPari", type="integer")
     */
    private $idPari;

    /**
     * @ORM\Column(name ="idJoueur", type="integer")
     */
    private $idJoueur;

    /**
     * @ORM\Column(name ="idMatch", type="integer")
     */
    private $idMatch;

    /**
     * @ORM\Column(name ="statusPari", type="string")
     */
    private $statusPari;

    /**
     * @ORM\Column(name ="montant", type="float")
     */
    private $montant;

    /**
     * @ORM\Column(name ="equipePari", type="string")
     */
    private $equipePari;

    public function __construct($idPari, $idMatch, $idJoueur, $montant, $equipe, $statut)
    {

        $this->setIdPari($idPari);
        $this->setIdMatch($idMatch);
        $this->setIdJoueur($idJoueur);
        $this->setMontant($montant);
        $this->setEquipePari($equipe);
        $this->setStatusPari($statut);

    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idPari
     *
     * @param integer $idPari
     * @return Pari
     */
    public function setIdPari($idPari)
    {
        $this->idPari = $idPari;

        return $this;
    }

    /**
     * Get idPari
     *
     * @return integer 
     */
    public function getIdPari()
    {
        return $this->idPari;
    }

    /**
     * Set idJoueur
     *
     * @param integer $idJoueur
     * @return Pari
     */
    public function setIdJoueur($idJoueur)
    {
        $this->idJoueur = $idJoueur;

        return $this;
    }

    /**
     * Get idJoueur
     *
     * @return integer 
     */
    public function getIdJoueur()
    {
        return $this->idJoueur;
    }

    /**
     * Set idMatch
     *
     * @param integer $idMatch
     * @return Pari
     */
    public function setIdMatch($idMatch)
    {
        $this->idMatch = $idMatch;

        return $this;
    }

    /**
     * Get idMatch
     *
     * @return integer 
     */
    public function getIdMatch()
    {
        return $this->idMatch;
    }

    /**
     * Set statusPari
     *
     * @param string $statusPari
     * @return Pari
     */
    public function setStatusPari($statusPari)
    {
        $this->statusPari = $statusPari;

        return $this;
    }

    /**
     * Get statusPari
     *
     * @return string 
     */
    public function getStatusPari()
    {
        return $this->statusPari;
    }

    /**
     * Set montant
     *
     * @param float $montant
     * @return Pari
     */
    public function setMontant($montant)
    {
        $this->montant = $montant;

        return $this;
    }

    /**
     * Get montant
     *
     * @return float 
     */
    public function getMontant()
    {
        return $this->montant;
    }

    /**
     * Set equipePari
     *
     * @param string $equipePari
     * @return Pari
     */
    public function setEquipePari($equipePari)
    {
        $this->equipePari = $equipePari;

        return $this;
    }

    /**
     * Get equipePari
     *
     * @return string 
     */
    public function getEquipePari()
    {
        return $this->equipePari;
    }
}
