import { NextSeo } from 'next-seo'
import NextLink from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  Text,
  Link,
  Icon,
  ButtonGroup,
  useColorModeValue,
} from '@chakra-ui/react'

import { supabase } from '../../../utils/initSupabase'
import { getPagination } from '../../../utils/pagination'

import ContainerHome from '../../../layouts/container/home'

import { FaExternalLinkAlt } from 'react-icons/fa'
import imageEmpty from '../../../public/image-empty.svg'

function Provocation({ data, count, pagination }) {
  const router = useRouter()

  const cardBorderColor = useColorModeValue('gray.100', 'gray.900')

  const handlePagination = value => {
    router.push(`/report/provocation/?page=${value}`)
  }

  return (
    <>
      <NextSeo
        title="Lapor Provokasi"
        titleTemplate="%s | Better Esport"
        description="List akun provokasi untuk membuat komunitas esport Indonesia lebih baik."
      />
      <Container maxW="container.lg" minH={'90vh'}>
        <Flex
          py={10}
          justify={'space-between'}
          direction={{ base: 'column', md: 'row' }}
        >
          <Box mb={{ base: 6, lg: 0 }}>
            <Heading lineHeight={1.1} fontWeight={700} fontSize={'3xl'}>
              Lapor Provokasi
            </Heading>
          </Box>
          <NextLink href="/report/provocation/create">
            <Button lineHeight={0} colorScheme="teal" variant="solid">
              Lapor
            </Button>
          </NextLink>
        </Flex>

        <Box mb={6}>
          <Text mb={4}>Daftar Laporan Akun</Text>
          {data.map(item => (
            <Box
              key={item.id_report_provocation}
              border={'1px'}
              borderColor={cardBorderColor}
              borderRadius={8}
              p={4}
              mb={3}
            >
              <Flex
                justify={'space-between'}
                direction={{ base: 'column-reverse', md: 'row' }}
              >
                <Box>
                  <Flex mb={2}>
                    <Image
                      src={item.social_media.icon}
                      alt={item.social_media.name}
                      width={26}
                      height={26}
                    />
                    <Box ms={2} fontSize={'lg'}>
                      {item.username}
                    </Box>
                  </Flex>
                  <Box>
                    <Text as={'span'} fontWeight={600}>
                      Bukti
                    </Text>
                    :{' '}
                    <Link
                      target="_blank"
                      href={item.evidence_link}
                      rel="noopener noreferrer"
                      isExternal
                    >
                      <Text as={'span'}>
                        Link <Icon as={FaExternalLinkAlt} w={3} h={3} />
                      </Text>
                    </Link>
                  </Box>
                </Box>
                <Box
                  ms={{ base: 0, lg: 3 }}
                  mb={{ base: 6, lg: 0 }}
                  w={16}
                  h={16}
                  border={'1px'}
                  borderColor={cardBorderColor}
                  borderRadius={8}
                  p={1}
                >
                  {item.evidence ? (
                    <Link
                      as={'a'}
                      target="_blank"
                      href={item.evidence}
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={item.evidence}
                        alt={`Bukti ${item.username}`}
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="cover"
                      />
                    </Link>
                  ) : (
                    <Image src={imageEmpty} alt={'Image Empty'} />
                  )}
                </Box>
              </Flex>
            </Box>
          ))}
          <Flex
            justify={'space-between'}
            direction={{ base: 'column', md: 'row' }}
          >
            <Box
              mb={{ base: 2, lg: 0 }}
              textAlign={{ base: 'center', lg: 'start' }}
            >
              Ditemukan {pagination.total_items} data.
            </Box>
            <Box textAlign={{ base: 'center', lg: 'start' }}>
              <ButtonGroup size="sm" isAttached variant="outline">
                <Button
                  mr="-px"
                  isDisabled={pagination.previous_page < 1}
                  onClick={() => handlePagination(pagination.previous_page)}
                >
                  Sebelumnya
                </Button>
                <Button
                  mr="-px"
                  isDisabled={pagination.next_page > pagination.total_pages}
                  onClick={() => handlePagination(pagination.next_page)}
                >
                  Selanjutnya
                </Button>
              </ButtonGroup>
            </Box>
          </Flex>
        </Box>
      </Container>
    </>
  )
}

export const getSupabasePagination = (page, size) => {
  const from = size * page - size
  const to = from + size - 1

  return { from, to }
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const perPage = 10
  const { from, to } = getSupabasePagination(page, perPage)

  const { data: reportProvocation, count } = await supabase
    .from('report_provocation')
    .select('*, social_media (code, name, icon)', { count: 'exact' })
    .range(from, to)

  const pagination = getPagination(count, from, perPage)

  return {
    props: {
      data: reportProvocation,
      count: count,
      pagination: pagination,
    },
  }
}

Provocation.Layout = ContainerHome

export default Provocation
