<?php
    require_once('../config/conexion.php');
    require_once('../models/producto.php');
    $productocontrolador = new producto();

    //se edita si hay nuevo campo en el array
    switch($_GET["op"]){
        case "listar":
            $datos=$productocontrolador->get_producto();
            $data= Array();
            foreach($datos as $row){
                $sub_array= array();
                $sub_array[]=$row["prod_id"];
                $sub_array[]=$row["prod_nom"];
                $sub_array[]=$row["prod_desc"];
                $sub_array[]= '<button type="button" onClick="editar('.$row["prod_id"].');" id="'.$row["prod_id"].'" class="btn btn-outline-primary btn-icon"><div><i class="fa fa-edit"></i></div></button>';
                $sub_array[]= '<button type="button" onClick="ver('.$row["prod_id"].');" id="'.$row["prod_id"].'" class="btn btn-outline-info  btn-icon"><div><i class="fa fa-eye"></i></div></button>';
                $sub_array[]= '<button type="button" onClick="eliminar('.$row["prod_id"].');" id="'.$row["prod_id"].'" class="btn btn-outline-danger btn-icon"><div><i class="fa fa-trash"></i></div></button>';
                $data[]=$sub_array;
            }

            $result = array(
                "sEcho" => 1,
                "iTotalRecords" =>count($data),
                "iTotalDisplayRecords" => count($data),
                "aaData" => $data);
            echo json_encode($result);

            break;
        
        //se edita si hay campo nuevo
        case "guardaryeditar" :
            $datos=$productocontrolador->get_producto_x_id($_POST["prod_id"]);
            if(empty($_POST["prod_id"])){
                if(is_array($datos)==true and count($datos)==0){
                    $productocontrolador->insert_producto($_POST['prod_nom'], $_POST['prod_desc']);
                    //echo "Se Agrego";
                }
            }else{
                $productocontrolador->update_producto($_POST['prod_id'],$_POST['prod_nom'], $_POST['prod_desc']);
                    //echo "No se Guardo";
            }
            break;
        
        //se edita si hay campo nuevo
        case "mostrar" :
            $datos=$productocontrolador->get_producto_x_id($_POST["prod_id"]);
            if(is_array($datos)==true and count($datos)>0){
                foreach($datos as $row){
                    $output["prod_id"] = $row['prod_id'];
                    $output["prod_nom"] = $row['prod_nom'];
                    $output["prod_desc"] = $row['prod_desc'];
                }
                echo json_encode($output);
            }
            break;

        /*case "ver" :
            $datos=$productocontrolador->get_producto();
            $data= Array();
            foreach($datos as $row){
                $sub_array= array();
                $sub_array[]=$row["prod_id"];
                $sub_array[]=$row["prod_nom"];
                $sub_array[]=$row["prod_desc"];
                $data[]=$sub_array;
                }
                echo json_encode($output);
            break;
        */
        case "eliminar" :
            $productocontrolador->delete_producto($_POST["prod_id"]);
            break;
    }
?>