import React from "react";
import Swal from "sweetalert2";
import { Box, Flex, Text, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from "@chakra-ui/react";
import {Buttons} from "../../components/Baru/ButtonBack";
import {ButtonsCancel} from "../../components/Baru/ButtonBack";
import { ButtonBack } from "../../components/Baru/ButtonBack";
import { useDisclosure } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RuleCard from "../../components/RuleCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import axios from "axios";


const DetailClub = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  const location = useLocation()
  const id = location?.state?.id

  const currentUser = useSelector((state) => state.users.currentUser)
  const token = currentUser.token
  const idUser = currentUser.id
  console.log(idUser)

  const config = {
    headers: {Authorization : `Bearer ${token}`},
  }

  const [getClubDetail, setGetClubDetail] = useState([])
  const [loading, setLoading] = useState(false)

  const getDetailClub = async () => {
    await axios.get(`https://rubahmerah.site/clubs/${id}`, config)
    .then((response) => {
      setLoading(true)
      setGetClubDetail(response.data.data)
      setLoading(false)
      console.log(response.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  const [status, setStatus] = useState('')
  const onSubmitHandler = async() => {
    const form = new FormData()
    form.append("user_id", idUser )
    form.append("club_id", id)
    form.append("status", "requested")

    await axios.post(`https://rubahmerah.site/members`,form ,config)
    .then((response) => {
      Swal.fire({
        position: "center",
        icon: "success",
        text: `Join Event successfully `,
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/detailevent");
    })
    .catch((err) => {
      console.log(err)
      Swal.fire({
        position: "center",
        icon: "error",
        text: `failed`,
        showConfirmButton: true,
        timer: 1000,
      });
    })
  }

  useEffect(() => {
    getDetailClub()
  }, [])


  return (
  <Layout>
         <Box p='8' px={'10%'} w={'100vw'}>
            <ButtonBack/>
            <Flex mb={20}>
            <Box w={'70%'}>
              <Flex>
                <Image
              src={getClubDetail.logo}
              objectFit='cover'
              maxW={{ base: '100%', sm: '500px' }}
              mt={10}
              rounded='xl'
              />
              <Box mt={10} ml={20}>
              <Text fontSize={'7xl'}>{getClubDetail.name}</Text>
              <Text fontSize={'3xl'} mt={5} ml={2}>Member : {getClubDetail.joined_member} / {getClubDetail.member_total}</Text>
              <Text fontSize={'3xl'} mt={5} ml={2}>Category : {getClubDetail.category_name}</Text>
              <Text fontSize={'3xl'} mt={5} ml={2}>{getClubDetail.city}, {getClubDetail.address}</Text>
              </Box>
              </Flex>
              <Text fontSize={'3xl'} mt={'20'}>Club Description :</Text>
              <Text fontSize={'xl'} mt={'2'} w={'60%'}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</Text>
            </Box>
            <RuleCard
            key = {getClubDetail.id}
            rule = {getClubDetail.rule}
            />
          </Flex>
      
      <Box ml='auto' justif='end' w={'131px'}>
        <Buttons  openTrigger={onOpen} textContent="Join"/>
        <Modal isOpen={isOpen} onClose={onClose} h={'100px'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader mx='auto'>Requirement</ModalHeader>
            <ModalCloseButton />
            <ModalBody h={'100px'} overflowY='scroll'>
              <Text h={'300px'}>{getClubDetail.requirement}</Text>
            </ModalBody>

            <ModalFooter>
              <ButtonsCancel textContent="Cancel" mr="10" openTrigger={onClose}/>
              <Buttons textContent="Accept" openTrigger={onSubmitHandler}/>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
    </Layout>

  )
};

export default DetailClub;
