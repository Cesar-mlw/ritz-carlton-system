/**
 *
 * HotelRoomCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import { 
  Card, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  Typography, 
  withStyles, 
  Dialog, 
  Slide, 
  DialogTitle, 
  DialogContent,
  Button, 
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
   } from '@material-ui/core'
import hotelRoomImg from '../../images/hotelRoomImg.png'
import greenBall from '../../images/greenBall.png'
import redBall from '../../images/redBall.png'
import yellowBall from '../../images/yellowBall.png'
import { MeetingRoom, PriorityHigh, Block, Done, AttachMoney, Palette, ExpandMore } from '@material-ui/icons'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';


//Notas sobre usuários
//Camareira - Registra consumo do quarto
//Atendente - Faz reservas
//Supervisor de Acomodação - Edita dados do quarto

//Cores para vacant Status
//Verde - Disponível
//Vermelho - Ocupado (colocar dentro do diálogo data de até quando a reserva é vigente)
//Amarelo - Limpeza / Interditado



//Props taken
// -- ATENDENTE --
//numeroQuarto
//tipoQuarto
//vacant
//tipoUsuario
//precoDiaria
//ocupUntil
// -- CAMAREIRA -- 
//Lista de Produtos
  //nomeProduto
  //precoProduto
  //qtdeProduto
const style = {
  root:{
    marginLeft:'1vw',
    marginTop: '1vh'
  },
  card:{
    maxWidth: 345,
  },
  media:{
    objectFit: 'cover',
  },
  title:{
    marginBottom: 0.5
  },
  cardVacantImg: {
    width: 25,
    height: 25,
    marginLeft: '18.5vw',
    marginTop: '-8vh'
  },
  dialog:{
    maxWidth: 1500
  },
  dialogRoot:{
    display: 'flex',
    flexWrap: 'wrap',
  },
  dialogInfoText: {
    fontSize: '0.8em',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '2.5vw',
    marginTop: '2.5vh',
  },
  hotelRoomImgInCard:{
    width: '18vw',
    height: '18vh',
    marginLeft: '7vw'
  },
  btnReservarAtendente: {
    color: "#BAB392",
    marginLeft: "12vw",
    marginTop: "5vh"
  },
  expansionPanelSummaryColumn:{
    flexBasis: '33.33%'
  },
  expPanelDetails: {
    alignItems: 'center'
  },
  expPanelDetailsText:{
    marginTop: '1vh'

  },
}


class HotelRoomCard extends React.Component {
  state={
    dialogOpen: false,
  }
  Transition = props => {
    return <Slide direction='up' {...props}/>
  } 
  handleDialogClose = () =>{
    this.setState({dialogOpen: false})
  }
  handleDialogOpen = () => {
    this.setState({dialogOpen: true})
  }
  handleProductList = listaProduto => {
    const elements = []
    listaProduto.map(prd => {
      elements.push(
        <ExpansionPanel
          fullWidth
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
            <div className={style.expansionPanelSummaryColumn}>
              <Typography variant="overline">{prd.nome}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={style.expPanelDetails}>
            <div style={style.expPanelDetailsText}>
              <Typography variant='overline' >Preço: R${prd.preco}</Typography>
              <Typography variant='overline' >Quantidade Consumida: {prd.qtde}</Typography>
              <Typography variant='overline' >Total Gasto: R${parseFloat(prd.qtde * prd.preco)}</Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
    return elements
  }
  render() {
    const { classes } = this.props
    const { dialogOpen } = this.state
    console.log(this.props.vacant)
    return (
      <div className={classes.root}>
        <Card className={classes.card} onClick={this.handleDialogOpen}>
          <CardActionArea>
            <CardMedia
              component='img'
              alt='Interior do Quarto'
              height='140'
              image={hotelRoomImg}
              title='Interior do Quarto'
            />
            <CardContent>
              <Typography className={classes.title} gutterBottom variant='overline' >Número do Quarto: {this.props.numeroQuarto}</Typography>
              <Typography variant='caption'>Tipo do Quarto: {this.props.tipoQuarto}</Typography>
              <img src={(this.props.vacant == "disp") ? greenBall : (this.props.vacant == "ocup") ? redBall : yellowBall} className={classes.cardVacantImg}/>
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          open={dialogOpen}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          onClose={this.handlDialogClose}
          onBackdropClick={this.handleDialogClose}
          className={classes.dialog}
        >
          <DialogTitle>
            <Typography variant="overline" style={{fontSize:"0.9em"}}> Informações Adicionais </Typography>
          </DialogTitle>
          <DialogContent>
            {this.props.tipoUsuario == "atendente" && (
              <div className={classes.dialogRoot}>
                <div>
                  <Typography className={classes.dialogInfoText} variant='overline'><MeetingRoom/> {this.props.numeroQuarto}</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'>{(this.props.vacant == "inter") ? <PriorityHigh/> : (this.props.vacant == "ocup") ? <Block/> : <Done/>} {(this.props.vacant == 'disp') ? 'Disponível': (this.props.vacant == 'ocup') ? "Ocupado": (this.props.vacant == 'inter') ? "Interditado" : "Limpando"}</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'><Palette/> {this.props.tipoQuarto}</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'><AttachMoney/> {this.props.precoDiaria},00 / Dia</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'>{(this.props.vacant == "disp") ?  "Próxima reserva:": "Ocupado até:"} {this.props.ocupUntil}</Typography>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    className={classes.btnReservarAtendente}
                  >
                    Efetuar Reserva
                  </Button>
                </div>
              </div>
            )}
            {this.props.tipoUsuario == "camareira" && (
              <div >
                  {this.handleProductList(this.props.listaProduto)}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
// Organizar por numero de quarto
// Busca pelo quarto
// 
HotelRoomCard.propTypes = {
  numeroQuarto: PropTypes.string.isRequired,
  tipoQuarto: PropTypes.string.isRequired,
  vacant: PropTypes.string,
  tipoUsuario: PropTypes.string.isRequired,
  precoDiaria: PropTypes.string,
};

export default withStyles(style)(HotelRoomCard);
