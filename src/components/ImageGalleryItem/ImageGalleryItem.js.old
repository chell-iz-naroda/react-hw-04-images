import { GalleryImg, GalleryItem } from "./ImageGalleryItem.styled";
import { Component } from "react";
import { Modal } from "components/Modal/Modal";

export class ImageGalleryItem extends Component {
    state = {
        isOpen: false,
    };


    toggleModal = () => {
        this.setState(({ isOpen }) => ({
            isOpen: !isOpen,
        }));
    };


    render() {
        const { largeImageURL, webformatURL, tags } = this.props;
        const { isOpen } = this.state;
        return (
            <>
                <GalleryItem>
                    <GalleryImg
                        src={webformatURL}
                        alt={tags}
                        onClick={this.toggleModal}
                    />
                </GalleryItem>
                {isOpen && (
                    <Modal onClose={this.toggleModal} src={largeImageURL} alt={tags} />
                )}
            </>
        );
    }
}
